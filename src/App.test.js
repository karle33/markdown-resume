import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import resume from './store/resume';
import navbar from './store/navbar';

jest.mock('./layout/Resume', () => () => <div />);
jest.mock('./layout/NormalResume', () => () => <div />);
jest.mock('./layout/Dialog', () => () => <div />);
jest.mock('./layout/Hint', () => () => <div />);
jest.mock('./layout/Navbar', () => () => <div />);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App resume={resume} navbar={navbar} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('hides the resume scrollbar while exporting', () => {
  const div = document.createElement('div');
  navbar.setExported(true);

  ReactDOM.render(<App resume={resume} navbar={navbar} />, div);

  expect(div.querySelector('main').style.overflow).toBe('hidden');

  ReactDOM.unmountComponentAtNode(div);
  navbar.setExported(false);
});
