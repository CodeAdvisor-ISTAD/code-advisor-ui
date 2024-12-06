import React from 'react';

const DataBlock = ({ number, text }: { number: string; text: string }) => (
  <div className="flex flex-col items-center relative">
    <div className="font-khFont text-lg">{number}</div>
    <div className="h-3 w-3 bg-red-400 rounded-sm mb-7"></div>
    <div className="font-bold text-sm font-khFont absolute top-12 text-center whitespace-nowrap">
      {text}
    </div>
  </div>
);

const UserActivity = () => (
  <div className="w-full max-w-3xl justify-center items-center flex flex-col">
    <ol className="flex items-center w-[450px] justify">
      <DataBlock number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
      <div className="flex w-full items-center">
        <div className="h-1 w-full bg-cyan-600 rounded-sm"></div>
      </div>
      <DataBlock number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
      <div className="flex w-full items-center">
        <div className="h-1 w-full bg-cyan-600 rounded-sm"></div>
      </div>
      <DataBlock number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
      <div className="flex w-full items-center">
        <div className="h-1 w-full bg-cyan-600 rounded-sm"></div>
      </div>
      <DataBlock number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
      <div className="flex w-full items-center">
        <div className="h-1 w-full bg-cyan-600 rounded-sm"></div>
      </div>
      <DataBlock number="៥៦" text="ធ្លាប់ចូលចិត្ត" />
    </ol>
  </div>
);

export default UserActivity;
const UserActivityComponent = () => {
  return <UserActivity />;
};