import React, { useState } from 'react'
import SortableTree from 'react-sortable-tree-patch-react-17';
import 'react-sortable-tree-patch-react-17/style.css'; // This only needs to be imported once in your app
const Tree = () => {

    const [treeData, setTreeData] = useState({
        items: [
            { title: 'Chicken', children: [{ title: 'Egg' }], expanded: true },
            { title: 'Fish', children: [{ title: 'fingerline' }], expanded: true },
        ],
    });

    return (
        <SortableTree
            treeData={treeData.items}
            onChange={(treeData) => setTreeData({ items: treeData })}
        />
    )
}

export default Tree