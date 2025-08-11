'use client'
import { getFirstMovieTrailerKey } from "@/services/movie-services";
import { useEffect, useState } from "react";

export const MovieTrailerCard = ({ id }: { id: number }) => {
  const [key, setKey] = useState("");
  useEffect(() => {
    const fetchMovieTrailer = async () => {
      try {
        const response = await getFirstMovieTrailerKey(id);
        setKey(response);
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    fetchMovieTrailer();
  }, [id]);

  return (
    <>
      <iframe
        width="500"
        height="380"
        src={`https://www.youtube.com/embed/${key}`}
        title="YouTube video player"
        frameBorder="0"
        className="w-full rounded-lg "
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </>
  );
};
