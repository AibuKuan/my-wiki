"use client";

import { useNavigationStore } from "@/app/stores/use-navigation-store";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageLightweight } from "@/services/page";
import Link from "next/link";
import React from "react";
import { PageBreadcrumbSkeleton } from "./breadcrumb-skeleton";

export function PageBreadcrumbClient({ crumbs }: { crumbs: any }) {
  const isNavigating = useNavigationStore((state) => state.isNavigating);

  if (isNavigating) {
    return <PageBreadcrumbSkeleton />;
  }

  if (!crumbs || crumbs.length === 0) return null;

  return (
    <>
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className="max-w-[100px] truncate"
                href={`/page/${crumbs[0].id}`}
              >
                {crumbs[0].title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {crumbs.length > 1 && (
            <>
              {crumbs.length > 4 ? (
                <>
                  <BreadcrumbTrigger
                    crumbs={crumbs.slice(1, crumbs.length - 2)}
                  />
                  <BreadcrumbItems crumbs={crumbs.slice(crumbs.length - 2)} />
                </>
              ) : (
                <BreadcrumbItems crumbs={crumbs.slice(1)} />
              )}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="md:hidden">{crumbs[0].title}</h1>
    </>
  );
}

function BreadcrumbTrigger({ crumbs }: { crumbs: PageLightweight[] }) {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon-sm" variant="ghost">
              <BreadcrumbEllipsis />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              {crumbs.map((crumb) => (
                <DropdownMenuItem key={crumb.id} asChild>
                  {/* Fixed: Added Link so the dropdown actually works */}
                  <Link
                    className="max-w-[100px] truncate"
                    href={`/page/${crumb.id}`}
                  >
                    {crumb.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
    </>
  );
}

function BreadcrumbItems({ crumbs }: { crumbs: PageLightweight[] }) {
  return (
    <>
      {crumbs.map((crumb, index) => {
        // Check if this is the absolute last item in the full breadcrumb path
        const isLast = index === crumbs.length - 1;

        return (
          <React.Fragment key={crumb.id}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="max-w-[150px] truncate">
                  {crumb.title}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    className="max-w-[100px] truncate"
                    href={`/page/${crumb.id}`}
                  >
                    {crumb.title}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        );
      })}
    </>
  );
}
