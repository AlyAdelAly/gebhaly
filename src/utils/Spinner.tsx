import Image from 'next/image';
import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => <Fragment>
    <Image src={spinner} alt="Loading..." className='w-52 m-auto block' width={100} height={100} />
</Fragment>

export default Spinner;