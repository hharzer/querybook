import React from 'react';
import { useSelector } from 'react-redux';

import { IQueryExecution } from 'const/queryExecution';
import { currentEnvironmentSelector } from 'redux/environment/selector';
import { QueryExecutionBar } from 'components/QueryExecutionBar/QueryExecutionBar';
import { QueryExecution } from 'components/QueryExecution/QueryExecution';
import { QueryExecutionDuration } from 'components/QueryExecution/QueryExecutionDuration';

export const QueryViewExecution: React.FunctionComponent<{
    queryExecution: IQueryExecution;
}> = ({ queryExecution }) => {
    const environment = useSelector(currentEnvironmentSelector);
    const generatePermaLink = React.useCallback(() => {
        if (!queryExecution) {
            return null;
        }

        return `${location.protocol}//${location.host}/${environment.name}/query_execution/${queryExecution.id}`;
    }, [queryExecution, environment]);

    const queryExecutionDOM = queryExecution && (
        <div className="query-execution-section-inner">
            <div className="horizontal-space-between">
                <QueryExecutionDuration queryExecution={queryExecution} />
                <QueryExecutionBar
                    queryExecution={queryExecution}
                    permalink={generatePermaLink()}
                />
            </div>
            <QueryExecution id={queryExecution.id} key={queryExecution.id} />
        </div>
    );

    const queryExecutionSectionDOM = (
        <div className="query-execution-section">
            {/* <Resizable
                defaultSize={{
                    width: '100%',
                    height: '300px',
                }}
                enable={enableResizable({ top: true })}
            > */}
            {queryExecutionDOM}
            {/* </Resizable> */}
        </div>
    );

    return queryExecutionSectionDOM;
};
