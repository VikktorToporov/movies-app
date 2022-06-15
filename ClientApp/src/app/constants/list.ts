import { movie } from "./movie";

export interface list {
    id: string,
    name: string,
    movies: movie[],
    movieCount: number,
    userId: any,
    private: boolean,
}