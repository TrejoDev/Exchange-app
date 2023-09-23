import { useState, useEffect } from "react";
import { exchangeApi } from "@/api";
import { Latest } from "@/interface";

export const useAxios = (url: string, ) => {
  const [data, setData] = useState<Latest>({
                                                      success: false,
                                                      timestamp: 0,
                                                      base: "",
                                                      date: "",
                                                      rates: {
                                                          rates: {}
                                                      }
                                                    });    
  const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            const { data  } = await exchangeApi.get<Latest>( url );
            setData( data )
            setIsLoading( true )
        } catch (error) {
            console.log(error)
        } finally {
          setIsLoading( false )
        }
    };

  useEffect(() => {
  
    fetchData();
  }, [ url ]);

  return {
    isLoading,
    data
    }

}
