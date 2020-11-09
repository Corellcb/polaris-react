import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {findByTestID, mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Link} from 'components';

import {Tooltip} from '../Tooltip';
import {TooltipOverlay} from '../components';

describe('<Tooltip />', () => {
  const tooltip = mountWithAppProvider(
    <Tooltip content="Inner content">
      <Link>link content</Link>
    </Tooltip>,
  );

  const wrapperComponent = findByTestID(tooltip, 'WrapperComponent');

  it('renders its children', () => {
    expect(tooltip.find('button').exists()).toBe(true);
  });

  it('does not render initially', () => {
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(false);
  });

  it('renders initially when active is true', () => {
    const tooltipActive = mountWithAppProvider(
      <Tooltip content="Inner content" active>
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(findByTestID(tooltipActive, 'TooltipOverlayLabel').exists()).toBe(
      true,
    );
  });

  it('passes preventInteraction to TooltipOverlay when dismissOnMouseOut is true', () => {
    const tooltipPreventInteraction = mountWithAppProvider(
      <Tooltip content="Inner content" active dismissOnMouseOut>
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(
      tooltipPreventInteraction.find(TooltipOverlay).prop('preventInteraction'),
    ).toBe(true);
  });

  it('renders on mouseOver', () => {
    wrapperComponent.simulate('mouseOver');
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(true);
  });

  it('renders on focus', () => {
    wrapperComponent.simulate('focus');
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(true);
  });

  it('unrenders its children on blur', () => {
    wrapperComponent.simulate('blur');
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(false);
  });

  it('unrenders its children on mouseLeave', () => {
    wrapperComponent.simulate('mouseLeave');
    expect(findByTestID(tooltip, 'TooltipOverlayLabel').exists()).toBe(false);
  });

  it('passes role="tool" to the activator wrapper', () => {
    const accessibilityLabel = 'accessibility label';
    const tooltip = mountWithApp(
      <Tooltip
        accessibilityLabel={accessibilityLabel}
        activatorWrapper="button"
        content="content"
      >
        Content
      </Tooltip>,
    );

    expect(tooltip).toContainReactComponent('button', {
      'aria-label': accessibilityLabel,
    });
  });

  it('passes accessibility label to the activator wrapper', () => {
    const tooltip = mountWithApp(
      <Tooltip activatorWrapper="button" content="content">
        Content
      </Tooltip>,
    );

    expect(tooltip).toContainReactComponent('button', {role: 'tooltip'});
  });
});
