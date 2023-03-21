## Description:

A function that allows to remove elements of all trkpt, for all trkseg in the trk of a gpx file.

## How to use:
```
node remover(element, input, output)
```
- element to be removed, eg 'time',
- input: gpx file from which an element is to be removed,
- output: seperately saved gpx file based on input without the removed element. default value = 'output.gpx'

## todo

- make more precise. eg allow users to remove elements from waypoits