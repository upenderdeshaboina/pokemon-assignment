import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { Pokemon, PokemonListResponse } from './types/pokemon';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTop, setShowTop] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get<PokemonListResponse>(
          'https://pokeapi.co/api/v2/pokemon?limit=150'
        );
        const pokemonData = await Promise.all(
          response.data.results.map(async (result) => {
            const pokemonResponse = await axios.get<Pokemon>(result.url);
            return pokemonResponse.data;
          })
        );
        setPokemon(pokemonData);
        const uniqueTypes = Array.from(
          new Set(
            pokemonData.flatMap((p) => p.types.map((t) => t.type.name))
          )
        ).sort();
        setTypes(uniqueTypes);
      } catch (err) {
        setError('Failed to fetch Pokemon data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPokemon = pokemon.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || p.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column position-relative" style={{overflow: 'hidden'}}>
      
      <svg className="pokeball-bg" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" stroke="#222" strokeWidth="4" fill="#fff" />
        <path d="M2 50h96" stroke="#222" strokeWidth="4" />
        <circle cx="50" cy="50" r="16" stroke="#222" strokeWidth="4" fill="#fff" />
        <circle cx="50" cy="50" r="8" fill="#f00" stroke="#222" strokeWidth="2" />
        <path d="M2 50a48 48 0 0 1 96 0" fill="#f00" />
      </svg>
      
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top mb-4" style={{background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)'}}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-3" href="#">
            <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Pokédex Logo" width={50} height={30} className="me-2" />
            Pokédex
          </a>
        </div>
      </nav>
      <main className="container flex-grow-1 pb-4 position-relative" style={{zIndex: 1}}>
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold mb-2">Pokédex</h1>
          <p className="lead text-secondary">Search and filter through 150 Pokémon</p>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          types={types}
        />
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
            <button className="btn btn-outline-primary ms-3" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <>
            {filteredPokemon.length === 0 ? (
              <div className="alert alert-info text-center mt-4">No Pokémon found matching your search criteria.</div>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {paginatedPokemon.map((p) => (
                  <PokemonCard key={p.id} pokemon={p} />
                ))}
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
      {/* Back to Top Button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn btn-primary pokedex-backtotop rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg"
          style={{ zIndex: 1050 }}
          aria-label="Back to top"
        >
          <i className="bi bi-arrow-up fs-3"></i>
        </button>
      )}
      {/* Footer */}
      <footer className="text-center py-4 mt-auto border-top shadow-sm" style={{background: 'linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)'}}>
        <div className="container">
          <span className="text-secondary">Pokédex UI &copy; {new Date().getFullYear()} &mdash; Powered by <a href="https://pokeapi.co/" className="text-primary text-decoration-none">PokeAPI</a> &amp; <a href="https://getbootstrap.com/" className="text-primary text-decoration-none">Bootstrap</a></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
