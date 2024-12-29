"use client";
import React, { useEffect, useRef, useState, useId } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [paused, setPaused] = useState(true);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const pausedRef = useRef();

  const id = useId();

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (timeElapsed % 3 === 0) {
      setSelectedColor(COLORS[0]);
    } else if (timeElapsed % 3 === 1) {
      setSelectedColor(COLORS[1]);
    } else {
      setSelectedColor(COLORS[2]);
    }
  }, [timeElapsed]);
  useEffect(() => {
    function incrementTime() {
      if (pausedRef.current) return;
      setTimeElapsed((currentTime) => currentTime + 1);
    }

    const intervalID = setInterval(() => {
      incrementTime();
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  className={styles.selectedColorOutline}
                  layoutId={id}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() => {
              if (paused) {
                setPaused(false);
              } else {
                setPaused(true);
              }
            }}
          >
            {paused ? <Play /> : <Pause />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setTimeElapsed(0);
              setPaused(true);
            }}
          >
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
