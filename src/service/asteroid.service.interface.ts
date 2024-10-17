import AsteroidsResponse from '../dto/asteroids.response'

interface IAsteroidService {
    getAsteroid: (date?: string, hasCount?: boolean, isDangerous?: boolean) => Promise<AsteroidsResponse>;
}

export { IAsteroidService }
