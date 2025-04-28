interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  types: string[];
}

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  types,
}: SearchBarProps) => {
  return (
    <form className="row g-3 align-items-center mb-4">
      <div className="col-md-8 col-12">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control shadow-none focus-ring"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search Pokémon"
          />
        </div>
      </div>
      <div className="col-md-4 col-12">
        <select
          className="form-select shadow-none"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type} className="text-capitalize">
              {type}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SearchBar; 