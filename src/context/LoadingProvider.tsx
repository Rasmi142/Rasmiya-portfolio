import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import Loading, { setProgress } from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
  isSoundEnabled: boolean;
  setIsSoundEnabled: (state: boolean) => void;
  finishLoading: () => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const finishLoadingRef = useRef<(() => Promise<number>) | null>(null);

  useEffect(() => {
    const progress = setProgress(setLoading);
    finishLoadingRef.current = progress.loaded;
    
    return () => progress.clear();
  }, []);

  const finishLoading = () => {
    if (finishLoadingRef.current) {
      finishLoadingRef.current();
    } else {
      setLoading(100);
    }
  };

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
    isSoundEnabled,
    setIsSoundEnabled,
    finishLoading,
  };

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
