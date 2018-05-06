// @flow
import React from 'react';
import type { I18nContextProps } from '../../providers/i18n';

export type LanguageChooserProps = {};

const LanguageChooser = (props: LanguageChooserProps & I18nContextProps) => (
  <button onClick={() => props.changeLanguage('pl')}>
    ::{props.language}::
  </button>
);

export default LanguageChooser;
