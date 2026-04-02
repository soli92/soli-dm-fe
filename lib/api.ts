const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.status}`);
  }

  return response.json();
}

// Campaigns
export async function getCampaigns() {
  return fetchAPI("/api/campaigns");
}

export async function getCampaign(id: string) {
  return fetchAPI(`/api/campaigns/${id}`);
}

export async function createCampaign(data: {
  name: string;
  description: string;
  system: string;
}) {
  return fetchAPI("/api/campaigns", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Characters
export async function getCharacters(campaignId?: string) {
  const query = campaignId ? `?campaignId=${campaignId}` : "";
  return fetchAPI(`/api/characters${query}`);
}

export async function getCharacter(id: string) {
  return fetchAPI(`/api/characters/${id}`);
}

export async function createCharacter(data: any) {
  return fetchAPI("/api/characters", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Dice Roller
export async function rollDice(dice: string) {
  return fetchAPI("/api/dice/roll", {
    method: "POST",
    body: JSON.stringify({ dice }),
  });
}

export async function getDiceHistory(limit = 10) {
  return fetchAPI(`/api/dice/history?limit=${limit}`);
}

// Wiki - Classes
export async function getClasses() {
  return fetchAPI("/api/wiki/classes");
}

export async function getClass(id: string) {
  return fetchAPI(`/api/wiki/classes/${id}`);
}

// Wiki - Races
export async function getRaces() {
  return fetchAPI("/api/wiki/races");
}

export async function getRace(id: string) {
  return fetchAPI(`/api/wiki/races/${id}`);
}

// Wiki - Deities
export async function getDeities() {
  return fetchAPI("/api/wiki/deities");
}

export async function getDeity(id: string) {
  return fetchAPI(`/api/wiki/deities/${id}`);
}

// Wiki - Rules
export async function getRules() {
  return fetchAPI("/api/wiki/rules");
}

export async function getRule(id: string) {
  return fetchAPI(`/api/wiki/rules/${id}`);
}
