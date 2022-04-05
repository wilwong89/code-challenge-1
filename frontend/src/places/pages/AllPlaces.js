import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PageChanger from '../components/PageChanger';

import { useHttpClient } from '../../shared/hooks/http-hook';

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let { page } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        let queryString = page ? `?page=${page}` : '';
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${queryString}`
        );
        setLoadedPlaces(responseData.places);
        console.log(responseData.places);
      } catch (err) {
        setLoadedPlaces([]);
      }
    };
    fetchPlaces();
  }, [sendRequest, page]);

  const placeDeletedHandler = () => {
    console.log('Delete not possible from this page');
  };

  const handleNextPage = () => {
    const pageNum = page || 1;
    if (loadedPlaces && loadedPlaces.length) {
      return `/places/${Number(pageNum) + 1}`;
    } else {
      return false;
    }
  };

  const handlePreviousPage = () => {
    const queryNum = page || 0;
    const pageNum = queryNum - 1;
    if (pageNum < 1) {
      return false;
    } else {
      return `/places/${pageNum}`;
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <React.Fragment>
          <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
        </React.Fragment>
      )}
      {!isLoading && (
        <PageChanger
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      )}
    </React.Fragment>
  );
};

export default AllPlaces;
