import { memo } from "react";

function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

//we can do like this or in separate variable above like: const ToogleSounds = memo(function(Toglesounds...))
export default memo(ToggleSounds);
