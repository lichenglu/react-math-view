// support use in browser extensions
import '@webcomponents/custom-elements'

import { MathfieldElement } from 'mathlive';
import 'mathlive/dist/mathlive.mjs';
import React, { useImperativeHandle, useMemo, useRef } from 'react';
import { MathViewProps } from './types';
import { filterConfig, useEventRegistration, useUpdateOptions, useValue } from './utils';

const MathView = React.forwardRef<MathfieldElement, MathViewProps>((props, ref) => {
  const _ref = useRef<MathfieldElement>(null);
  useImperativeHandle(ref, () => _ref.current!, [_ref]);
  const value = useValue(props, _ref);
  const [config, passProps] = useMemo(() => filterConfig(props), [props]);
  useEventRegistration(_ref, props);
  useUpdateOptions(_ref, config);

  return (
    <math-field
      {...passProps}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onChange={undefined}
      ref={_ref}
    >
      {value}
    </math-field>
  );
});

export * from './types';
export default MathView;
