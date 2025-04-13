export const startSpeechRecognition = (
  onResult: (transcript: string) => void,
  onError: (error: string) => void
) => {
  if (!('webkitSpeechRecognition' in window)) {
    onError('Speech recognition is not supported in this browser.');
    return null;
  }

  // @ts-ignore - WebkitSpeechRecognition is not in the types
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    onError(`Error occurred in recognition: ${event.error}`);
  };

  return recognition;
};