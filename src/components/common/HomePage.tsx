"use client";
import { useState } from "react";
import Dialog from "../assets/Dialog";
import Button from "../assets/Button";
import { LucideIceCream } from "lucide-react";

export default function HomePage() {
  const dialog = useState(false);

  function openDialog() {
    dialog[1](true);
  }
  return <main></main>;
}
