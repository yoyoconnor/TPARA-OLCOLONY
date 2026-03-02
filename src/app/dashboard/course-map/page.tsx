"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapPin, Layers, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { OL_COLONY_HOLES, COURSE_LOCATION } from "@/lib/course-data";
import type { HoleInfo } from "@/lib/course-data";

const HoleView3D = dynamic(
  () => import("./HoleView3D"),
  { ssr: false, loading: () => <div className="w-full aspect-[4/3] rounded-xl bg-slate-800 animate-pulse flex items-center justify-center text-slate-400">Loading 3D…</div> }
);

const TOUR_INTERVAL_MS = 4500;

export default function CourseMapPage() {
  const [selectedHole, setSelectedHole] = useState<HoleInfo>(OL_COLONY_HOLES[0]);
  const [tourActive, setTourActive] = useState(false);

  const goPrev = useCallback(() => {
    const i = OL_COLONY_HOLES.findIndex((h) => h.number === selectedHole.number);
    setSelectedHole(OL_COLONY_HOLES[i > 0 ? i - 1 : OL_COLONY_HOLES.length - 1]);
  }, [selectedHole.number]);

  const goNext = useCallback(() => {
    const i = OL_COLONY_HOLES.findIndex((h) => h.number === selectedHole.number);
    setSelectedHole(OL_COLONY_HOLES[i < OL_COLONY_HOLES.length - 1 ? i + 1 : 0]);
  }, [selectedHole.number]);

  useEffect(() => {
    if (!tourActive) return;
    const t = setInterval(goNext, TOUR_INTERVAL_MS);
    return () => clearInterval(t);
  }, [tourActive, goNext]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Interactive Course Map</h1>
        <p className="text-gray-500 mt-1">
          Ol&apos; Colony Golf Complex — all 18 holes with animated 3D views
        </p>
      </div>

      {/* Location map */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
          <MapPin className="w-5 h-5 text-green-600" />
          Course location
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          {COURSE_LOCATION.name} · {COURSE_LOCATION.address}
        </p>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm aspect-[2/1] min-h-[280px] bg-gray-100">
          <iframe
            title="Ol' Colony Golf Complex location"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${COURSE_LOCATION.lng - 0.015}%2C${COURSE_LOCATION.lat - 0.008}%2C${COURSE_LOCATION.lng + 0.015}%2C${COURSE_LOCATION.lat + 0.008}&layer=mapnik&marker=${COURSE_LOCATION.lat}%2C${COURSE_LOCATION.lng}`}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Interactive hole map — all 18 holes */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
          <Layers className="w-5 h-5 text-green-600" />
          Hole map — click any hole
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Click a hole to fly to its 3D view. Use arrows or start the tour to animate through the course.
        </p>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-b from-green-50/50 to-white p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 sm:gap-3 max-w-4xl mx-auto">
            {OL_COLONY_HOLES.map((hole) => {
              const isSelected = selectedHole.number === hole.number;
              return (
                <button
                  key={hole.number}
                  type="button"
                  onClick={() => setSelectedHole(hole)}
                  className={`
                    flex flex-col items-center justify-center rounded-xl border-2 py-2 px-1 sm:py-3 sm:px-2
                    transition-all duration-200 min-h-[56px] sm:min-h-[64px]
                    ${isSelected
                      ? "border-green-600 bg-green-600 text-white shadow-lg scale-105"
                      : "border-gray-200 bg-white text-gray-700 hover:border-green-400 hover:bg-green-50"
                    }
                  `}
                >
                  <span className="font-bold text-sm sm:text-base">{hole.number}</span>
                  <span className="text-[10px] sm:text-xs opacity-80">Par {hole.par}</span>
                </button>
              );
            })}
          </div>
          <div className="flex justify-center gap-2 mt-3 text-xs text-gray-500">
            <span>Front 9</span>
            <span className="text-gray-300">|</span>
            <span>Back 9</span>
          </div>
        </div>

        {/* Navigation + Tour */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTourActive((a) => !a)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-colors ${
              tourActive
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {tourActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {tourActive ? "Pause tour" : "Start tour"}
          </button>
        </div>
      </section>

      {/* 3D animated view */}
      <section>
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
          <span className="font-semibold text-gray-900">
            Hole {selectedHole.number}
          </span>
          <span className="text-gray-500">Par {selectedHole.par}</span>
          <span className="text-gray-500">{selectedHole.yards} yd</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Drag to rotate · scroll to zoom. Camera flies when you change holes.
        </p>
        <HoleView3D hole={selectedHole} />
      </section>
    </div>
  );
}
