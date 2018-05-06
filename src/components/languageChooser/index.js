// @flow
import React from 'react';
import LanguageChooserComponent from './LanguageChooser';
import { I18nContext } from '../../providers/i18n';
import type { LanguageChooserProps } from './LanguageChooser';

const LanguageChooser = (props: LanguageChooserProps) => (
  <I18nContext.Consumer>
    {context => <LanguageChooserComponent {...props} {...context} />}
  </I18nContext.Consumer>
);

export default LanguageChooser;
