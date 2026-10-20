"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

export default function AttributionInit() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
