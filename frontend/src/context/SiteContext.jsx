import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const SiteContext = createContext(null);

export const SiteProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/site/data');
      if (res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Error fetching site data:', err);
      setError('Failed to load application data. Please ensure database connection is configured.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendContact = async (formData) => {
    const res = await api.post('/site/contact', formData);
    return res.data;
  };

  return (
    <SiteContext.Provider
      value={{
        data,
        loading,
        error,
        refreshData: fetchData,
        sendContact,
        settings: data?.settings || {},
        services: data?.services || [],
        allServices: data?.allServices || [],
        products: data?.products || [],
        moreProducts: data?.moreProducts || [],
        stats: data?.stats || [],
        advisors: data?.advisors || [],
        coreTeam: data?.coreTeam || [],
        clients: data?.clients || [],
        pilots: data?.pilots || [],
        industries: data?.industries || [],
        techDomains: data?.techDomains || [],
        coreValues: data?.coreValues || [],
        advantages: data?.advantages || [],
        methodologies: data?.methodologies || [],
        comparisons: data?.comparisons || [],
        founderQuotes: data?.founderQuotes || [],
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => useContext(SiteContext);
