"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, RefreshCcw } from "lucide-react";

interface Option {
  id: number;
  text: string;
  consequence: string;
  ethicalScore: number;
}

interface Dilemma {
  id: number;
  title: string;
  description: string;
  options: Option[];
}

export default function Home() {
  const [dilemmas, setDilemmas] = useState<Dilemma[]>([]);

  useEffect(() => {
  const fetchDilemmas = async () => {
    try {
      const res = await fetch("http://localhost:8000/dilemmas");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setDilemmas(data);
    } catch (err) {
      console.error("Failed to fetch dilemmas:", err);
    }
  };

  fetchDilemmas();
}, []);


  const [currentDilemma, setCurrentDilemma] = useState<Dilemma | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [score, setScore] = useState<number>(0);

  const handleChoice = (option: Option) => {
    setSelectedOption(option);
    setScore((prev) => prev + option.ethicalScore);
  };

  const nextDilemma = () => {
    const currentIndex = dilemmas.findIndex((d) => d.id === currentDilemma?.id);
    if (currentIndex + 1 < dilemmas.length) {
      setCurrentDilemma(dilemmas[currentIndex + 1]);
      setSelectedOption(null);
    } else {
      setCurrentDilemma(null);
    }
  };

  const resetSimulation = () => {
    setScore(0);
    setCurrentDilemma(dilemmas[0]);
    setSelectedOption(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950 px-6 py-10">
      <main className="flex w-full max-w-2xl flex-col gap-8 rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg transition">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/next.svg" alt="Logo" width={50} height={50} />
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Simulador de Decisões Éticas
            </h1>
          </div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Pontuação ética:{" "}
            <span
              className={`font-bold ${
                score >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {score}
            </span>
          </p>
        </div>

        {!currentDilemma ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center gap-4 py-12"
          >
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
              Simulação concluída!
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Sua pontuação final foi {score}.
              {score > 10
                ? " Excelente senso ético!"
                : score > 0
                ? " Bom equilíbrio moral."
                : " Reveja suas decisões!"}
            </p>
            <button
              onClick={resetSimulation}
              className="mt-4 flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-2 text-white hover:bg-zinc-800 transition"
            >
              <RefreshCcw className="w-4 h-4" /> Reiniciar
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              key={currentDilemma.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                {currentDilemma.title}
              </h2>
              <p className="text-zinc-700 dark:text-zinc-400">
                {currentDilemma.description}
              </p>

              {currentDilemma?.options?.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleChoice(opt)}
                  disabled={!!selectedOption}
                  className={`rounded-xl border p-4 text-left transition ${
                    selectedOption?.id === opt.id
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {opt.text}
                </button>
              ))}

              {selectedOption && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 flex flex-col items-start gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 p-4"
                >
                  <div className="flex items-center gap-2">
                    {selectedOption.ethicalScore >= 0 ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      Consequência:
                    </span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-400">
                    {selectedOption.consequence}
                  </p>
                  <button
                    onClick={nextDilemma}
                    className="mt-4 rounded-full bg-zinc-900 px-5 py-2 text-sm text-white hover:bg-zinc-800 transition dark:bg-zinc-100 dark:text-black"
                  >
                    Próximo dilema
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
}
