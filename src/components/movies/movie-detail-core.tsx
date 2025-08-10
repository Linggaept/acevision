import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MovieDetail } from "@/types/movies";
import { Calendar, Clock, Globe, Star, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

// Sample data matching the MovieDetail interface
export default function MovieDetailCore({ movie }: { movie: MovieDetail }) {
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getLanguageName = (code: string) => {
    const languages: { [key: string]: string } = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
    };
    return languages[code] || code.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Backdrop Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden w-full">
        <Image
          src={
            `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.backdrop_path}` ||
            "/placeholder.svg"
          }
          alt={`${movie.title} backdrop`}
          width={1920}
          height={1080}
          className="object-cover w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent w-full" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-14">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-lg md:text-xl text-gray-200 italic">
                {movie.tagline}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-2xl rounded-lg py-0">
              <Image
                src={
                  `https://media.themoviedb.org/t/p/w440_and_h660_face${movie?.poster_path}` ||
                  "/placeholder.svg"
                }
                alt={`${movie?.title} poster`}
                width={500}
                height={800}
                className="w-full h-full bg-cover"
              />
            </Card>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie?.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary" className="text-sm">
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-5 w-5 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">{movie.vote_average}</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">
                    {movie.vote_count.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Votes</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-5 w-5 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">
                    {formatRuntime(movie.runtime)}
                  </div>
                  <div className="text-sm text-muted-foreground">Runtime</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-5 w-5 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">
                    {movie.popularity.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Popularity
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Overview */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.overview}
                </p>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Release Date:</span>
                    <span>{formatDate(movie.release_date)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Original Language:</span>
                    <span>{getLanguageName(movie.original_language)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Production Companies */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Production Companies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movie.production_companies.map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <Image
                        src={
                          `https://media.themoviedb.org/t/p/w440_and_h660_face${company.logo_path}` ||
                          "/placeholder.svg"
                        }
                        alt={`${company.name} logo`}
                        width={60}
                        height={60}
                        className="object-contain aspect-square"
                      />
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {company.origin_country}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
