import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserPreferences } from '../UserPreferences';
import { DEFAULT_SETTINGS } from '../../constants';
import { PreferencesContext } from '../../utils/PreferencesContext';

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

  it("updates UI", () => {
    render(<UserPrefTest />)
    const temperatureRange = screen.getByLabelText("set minimum temperature");
    const rainChance = screen.getByLabelText("set maximum chance of rain");
    const maxWindSpeed = screen.getByLabelText("set maximum wind speed");

    fireEvent.change(temperatureRange, {target: {value: 20}})
    expect(screen.getByText("20 F")).toBeInTheDocument()

    fireEvent.change(rainChance, {target: {value: 50}})
    expect(screen.getByText("50%")).toBeInTheDocument()

    fireEvent.change(maxWindSpeed, {target: {value: 5}})
    expect(screen.getByText("5 mph")).toBeInTheDocument()
  })

  it("resets UI", () => {
    render(<UserPrefTest />)
    const temperatureRange = screen.getByLabelText("set minimum temperature");
    const rainChance = screen.getByLabelText("set maximum chance of rain");
    const maxWindSpeed = screen.getByLabelText("set maximum wind speed");

    const reset = screen.getByText("Reset")

    fireEvent.change(temperatureRange, {target: {value: 20}})

    fireEvent.change(rainChance, {target: {value: 50}})

    fireEvent.change(maxWindSpeed, {target: {value: 5}})

    fireEvent.click(reset)
    expect(screen.getByText("65 F")).toBeInTheDocument()
    expect(screen.getByText("25%")).toBeInTheDocument()
    expect(screen.getByText("10 mph")).toBeInTheDocument()
  })
})