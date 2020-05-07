import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { UserPreferences } from '../UserPreferences';
import { DEFAULT_SETTINGS } from '../../constants';
import { PreferencesContext } from "../../utils/PreferencesContext";

const UserPrefTest = () => {
  const [preferences, setPreferences] = React.useState(DEFAULT_SETTINGS)
  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      <UserPreferences />
    </PreferencesContext.Provider>
  )
}

describe("<UserPreferences />", () => {
  it("renders without crashing", () => {
    expect(() => render(<UserPrefTest />)).not.toThrow()
  })

  it("renders header", () => {
    render(<UserPrefTest />)
    expect(screen.getByText("User Preferences")).toBeInTheDocument()
  })

  it("renders default preferences", () => {
    render(<UserPrefTest />)
    expect(screen.getByText("65 F")).toBeInTheDocument()
    expect(screen.getByText("25%")).toBeInTheDocument()
    expect(screen.getByText("10 mph")).toBeInTheDocument()
  })
})