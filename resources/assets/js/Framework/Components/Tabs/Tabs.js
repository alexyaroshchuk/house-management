import React from 'react';
import { Tabs } from 'antd';
import propTypes, { shape, number, string, element } from 'prop-types';

import './Tabs.scss';

const { TabPane } = Tabs;

const TabsDefault = (props) => {
    const { tabs, type, activeTabKey, onChange } = props;

    return (
        <Tabs activeKey={activeTabKey} onChange={onChange} type={type}>
            {tabs.map((tab) => {
                const { id, name, content, disabled } = tab;
                return (
                    <TabPane key={id} tab={name} disabled={disabled}>
                        {content}
                    </TabPane>
                );
            })}
        </Tabs>
    );
};

TabsDefault.defaultProps = {
    tabs: [],
};

TabsDefault.propTypes = {
    tabs: propTypes.arrayOf(
        shape({
            id: string,
            tab: string,
            content: element,
        })
    ).isRequired,
};

export default TabsDefault;
