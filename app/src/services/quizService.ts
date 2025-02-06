export const fetchQuestions = async () => {
  const API_URL =
    "https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=jeux_videos";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des questions :", error);
    return [];
  }
};
