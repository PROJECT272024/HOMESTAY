import { NextResponse } from 'next';
import { promisify } from 'util';
import { unlink } from 'fs';

const asyncUnlink = promisify(unlink);

export const POST = async (req) => {
  if (!req || !req.json) {
    return NextResponse.json({
      message: 'Invalid request',
      success: 400,
    });
  }

  try {
    let data = await req.json();
    console.log('I was suppose to be deleted - ', data.fileName);
    const path = `public/homestay/${data.fileName}`;

    await asyncUnlink(path);

    console.log('No problem - ', path);

    return new Response(JSON.stringify({'message':'File deleted sucessfully'}),{
        status:201
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({'message':'Problem in deleting files'}),{
        status:500
    });
  }
};