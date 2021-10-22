import {render, screen, fireEvent } from '@testing-library/react';
import VehiclesList from './Components/VehiclesList';
import userEvent from '@testing-library/user-event';
import VehicleCard from './Components/VehicleCard';
import ChosenCarModal from './Components/ChosenCarModel';
import '@testing-library/jest-dom/extend-expect';

describe('Test Select', () => {
it('checking default option of first select box', () => {
render (<VehiclesList />)
expect(screen.getByTestId('select-option', {name: '--Select Make--'}).selected).toBe(true)
})

it('allowing user changing the make', () => {
  render(<VehiclesList />)
  userEvent.selectOptions(
    screen.getByRole('combobox'),
    screen.getByTestId('select-option', { name: 'BMW' }),
  )
  expect(screen.getByTestId('select-option', { name: 'BMW' }).selected).toBe(true)
})
})

describe('Test SearchBar', () => {
it('changing searchTerm', () => {
  render(<VehiclesList />)
const input = screen.getByPlaceholderText('Search by body/fuel type')
fireEvent.change(input, {target: {value: 'newSearch'}})
expect(input.value).toBe("newSearch")
})

it('checking default search', () => {
  render(<VehiclesList />)
const input = screen.getByPlaceholderText('Search by body/fuel type')
fireEvent.change(input, {target: {value: 'newSearch'}})
expect(input).toBeTruthy()
})
})

describe('Test Buttons', () => {
it('checking if the modal is shown after clicking select button', () => {
  render(<VehicleCard />)
const button = screen.getByText('Select')
fireEvent.click(button)
expect(screen.getByTestId('show_modal')).toBeInTheDocument()
})

it('checking if confirmation is shown after clicking confirm button', () => {
  render(<ChosenCarModal />)
const button = screen.getByText('Confirm')
fireEvent.click(button)
expect(screen.getByText('The order has been confirmed')).toBeInTheDocument()
})
})