'use client'
import { useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import React from 'react'
import { api } from '../../../convex/_generated/api';
import { MenuIcon } from 'lucide-react';
import Title from '../DocumentTitle';
import Menu from '../DocumentMenu';
import Publish from '../DocumentPublish';

export default function Navbar({isCollapsed, onResetWidth}: {isCollapsed: boolean, onResetWidth: any}) {
  const params = useParams();

  const document: any = useQuery(api.documents.getById, {
    documentId: params.documentId as any,
  });
  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#000000] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
    <nav className='bg-background dark:bg-[#000000] px-3 py-2 w-full flex items-center gap-x-4 shadow'>
    {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
         <div className="flex items-center justify-between w-full ">
           <Title initialData={document} /> 
          <div className="flex items-center gap-x-2 z-[9999]">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
    </nav>
    </>
  )
}
