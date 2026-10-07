import type { Recommendations } from "@/lib/openai-recommend";

export type UserIdentity = {
  name: string;
  email: string;
};

export type StoredRecommendations = {
  recommendations: Recommendations | null;
  recommendationsError?: string;
};

const STORAGE_KEY = "laptop-quiz-user";
const ANSWERS_KEY = "laptop-quiz-answers";
const RECS_KEY = "laptop-quiz-recommendations";

export function saveUser(user: UserIdentity) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function loadUser(): UserIdentity | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as UserIdentity;
    if (!parsed.name || !parsed.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearUser() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function saveAnswers(answers: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function loadAnswers(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  const raw = sessionStorage.getItem(ANSWERS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function clearAnswers() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ANSWERS_KEY);
}

export function saveRecommendations(payload: StoredRecommendations) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(RECS_KEY, JSON.stringify(payload));
}

export function loadRecommendations(): StoredRecommendations | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(RECS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredRecommendations;
  } catch {
    return null;
  }
}

export function clearRecommendations() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(RECS_KEY);
}

export function clearQuizSession() {
  clearUser();
  clearAnswers();
}
