import React from 'react';
import Head from "next/head";
import Link from "next/link";
import {useIndexResourceState, IndexTable, Card, TextStyle,AppProvider} from '@shopify/polaris';

const IndexTableWithBulkActions = (users) => {
    console.log(users);
    const customers = [
      {
        id: '3413',
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
        orders: 20,
        amountSpent: '$2,400',
      },
      {
        id: '2563',
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
        orders: 30,
        amountSpent: '$140',
      },
    ];
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };
  
    const {
      selectedResources,
      allResourcesSelected,
      handleSelectionChange,
    } = useIndexResourceState(customers);
  
    const promotedBulkActions = [
      {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
      },
    ];
    const bulkActions = [
      {
        content: 'Add tags',
        onAction: () => console.log('Todo: implement bulk add tags'),
      },
      {
        content: 'Remove tags',
        onAction: () => console.log('Todo: implement bulk remove tags'),
      },
      {
        content: 'Delete customers',
        onAction: () => console.log('Todo: implement bulk delete'),
      },
    ];
  
    const rowMarkup = customers.map(
      ({id, name, location, orders, amountSpent}, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
          <IndexTable.Cell>
            <TextStyle variation="strong">{name}</TextStyle>
          </IndexTable.Cell>
          <IndexTable.Cell>{location}</IndexTable.Cell>
          <IndexTable.Cell>{orders}</IndexTable.Cell>
          <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
        </IndexTable.Row>
      ),
    );
  
    return (
        <AppProvider
            i18n={{
                Polaris: {
                ResourceList: {
                    sortingLabel: 'Sort by',
                    defaultItemSingular: 'item',
                    defaultItemPlural: 'items',
                    showing: 'Showing {itemsCount} {resource}',
                    Item: {
                    viewItem: 'View details for {itemName}',
                    },
                },
                Common: {
                    checkbox: 'checkbox',
                },
                },
            }}
            >
        <Card>
            <IndexTable
            resourceName={resourceName}
            itemCount={customers.length}
            selectedItemsCount={
                allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            bulkActions={bulkActions}
            promotedBulkActions={promotedBulkActions}
            headings={[
                {title: 'Name'},
                {title: 'Location'},
                {title: 'Order count'},
                {title: 'Amount spent'},
            ]}
            >
            {rowMarkup}
            </IndexTable>
        </Card>
      </AppProvider>
    );
  }
  export default IndexTableWithBulkActions;