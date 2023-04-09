export default function SearchBar({ changeSearchedSong }) {
  const onSearchChange = async (event) => {
    const { value: searchedSong } = event.target;
    changeSearchedSong(searchedSong);
  };

  const debounce = (cb) => {
    var timer;
    return (event) => {
      clearTimeout(timer);
      timer = setTimeout(() => cb(event), 500);
    };
  };

  const debounceSearch = debounce(onSearchChange);
  return (
    <input
      style={{ background: "rgba(255, 255, 255, 0.08)" }}
      type="text"
      placeholder="Search artist name"
      className="h-12 w-full rounded-lg  px-4 py-1 text-xl  text-white/60 outline-none"
      onChange={debounceSearch}
    />
  );
}
