import Select from 'react-select'
import { themeOptions } from '../Utils/themeOptions'
import { useTheme } from "../Context/ThemeContext";

const Footer = () => {

  const { theme, setTheme } = useTheme();

  localStorage.setItem("theme", JSON.stringify(theme));

  const handleChange = (e) => {
    setTheme(e.value);
  }

  return (
    <div className="footer">
      <div className="links">
        links
      </div>
      <div className="themeOptions">
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isFocused ? `${theme.background}` : `${theme.textColor}`,
            }),
          }}
          value={theme}
          onChange={handleChange}
          options={themeOptions}
          menuPlacement={"auto"}
        />
      </div>
    </div>
  )
}

export default Footer