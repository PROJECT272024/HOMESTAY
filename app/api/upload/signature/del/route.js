import cloudinary from '@/config/cloudinaryRelated';
import { NextResponse } from 'next';

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
    await cloudinary.uploader.destroy(data.fileName)

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