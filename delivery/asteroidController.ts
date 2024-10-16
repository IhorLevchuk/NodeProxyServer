import getAsteroid from '../usecases/fetchAsteroid'
import Exception from '../exception/Exception'
import AsteroidsResponseDto from '../dto/asteroidsResponseDto'
import { Request, Response, NextFunction } from 'express'

export const getAsteroids = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { count, wereDangerousMeteors, date } = req.query

    const asteroidResponseDto: AsteroidsResponseDto = await getAsteroid(date as string, Boolean(wereDangerousMeteors), Boolean(count))

    res.render('index.html', { body: asteroidResponseDto })
  } catch (error: any) {
    next(new Exception(500, error.message, {}))
  }
}

export default getAsteroids
