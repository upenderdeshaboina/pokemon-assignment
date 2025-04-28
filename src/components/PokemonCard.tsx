import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: { [key: string]: string } = {
  normal: 'secondary',
  fire: 'danger',
  water: 'primary',
  electric: 'warning',
  grass: 'success',
  ice: 'info',
  fighting: 'danger',
  poison: 'secondary',
  ground: 'warning',
  flying: 'info',
  psychic: 'info',
  bug: 'success',
  rock: 'dark',
  ghost: 'dark',
  dragon: 'primary',
  dark: 'dark',
  steel: 'secondary',
  fairy: 'info',
};

const lightTypes = ['warning', 'info', 'light', 'secondary'];
const getTextColor = (type: string) =>
  lightTypes.includes(typeColors[type] || 'secondary') ? 'text-dark' : 'text-white';

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="col mb-4">
      <div className="card pokedex-card h-100 shadow-lg border-0 rounded-4 position-relative animate__animated animate__fadeIn">
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-primary text-white fs-6 border border-2 border-primary">
            #{pokemon.id.toString().padStart(3, '0')}
          </span>
        </div>
        <div className="d-flex justify-content-center align-items-center bg-light rounded-4 mt-3" style={{height: '120px'}}>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="card-img-top w-auto"
            style={{maxHeight: '100px'}}
            loading="lazy"
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold text-capitalize mb-2">{pokemon.name}</h5>
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`badge pokedex-type-badge bg-${typeColors[type.type.name] || 'secondary'} ${getTextColor(type.type.name)} text-capitalize px-3 py-2 fs-6 shadow-sm`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; 