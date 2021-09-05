interface Score {
    timestamp: number;
    score: number;
  }
  
  const TOP_SCORES_LOCAL_STORAGE_KEY = "top-scores";
  const STORED_TOP_SCORES_SIZE = 5;
  
  export function getTopScores(): Score[] {
    let jsonScores = localStorage.getItem(TOP_SCORES_LOCAL_STORAGE_KEY);
    if (!jsonScores) {
      jsonScores = "[]"; // If there is no score data, fall back on an empty array.
    }
  
    const scores = JSON.parse(jsonScores);
    return scores;
  }
  
  export function setTopScores(scores: Score[]) {
    // Order the scores
    scores = scores.sort((a, b) => b.score - a.score);
    if(scores.length > STORED_TOP_SCORES_SIZE) {
      scores = scores.slice(0, STORED_TOP_SCORES_SIZE);
    }
  
    const jsonScores = JSON.stringify(scores);
  
    // Save this data to local storage
    localStorage.setItem(TOP_SCORES_LOCAL_STORAGE_KEY, jsonScores);
  }
  
  export function addScore(score: number) {
    const currentScores = getTopScores();
    currentScores.push({
      score,
      timestamp: Date.now()
    });
    setTopScores(currentScores);
  }