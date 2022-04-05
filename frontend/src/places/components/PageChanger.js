import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css';

const PageChanger = props => {
  const { handlePreviousPage, handleNextPage } = props;

  return (
    <div className="place-list center">
      <Card>
        {handlePreviousPage() && (
          <Link to={handlePreviousPage() || ''}>
            <Button>Previous page</Button>
          </Link>
        )}
        {handleNextPage() && (
          <Link to={handleNextPage() || ''}>
            <Button>Next page</Button>
          </Link>
        )}
      </Card>
    </div>
  );
};

export default PageChanger;
