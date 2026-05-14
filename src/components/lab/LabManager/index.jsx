import { useLabStore } from '../Store/useLabStore'
import OhmCalculator from '../OhmCalculator'
import ResistorDecoder from '../ResistorDecoder'

export default function LabManager() {
  const activeTools = useLabStore((state) => state.activeTools)

  return (
    <>
      {activeTools.ohm && <OhmCalculator />}
      {activeTools.resistor && <ResistorDecoder />}
    </>
  )
}