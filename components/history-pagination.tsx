'use client'

import { useRouter } from 'next/navigation'

import { ButtonPaginationSingleton } from '@/components/ui/pagination'

interface HistoryPaginationProps {
  currentPage: number
  totalPages: number
}

export function HistoryPagination({ currentPage, totalPages }: HistoryPaginationProps) {
  const router = useRouter()

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push('/history')
    } else {
      router.push(`/history?page=${page}`)
    }
  }

  return (
    <div className='flex justify-center mt-8'>
      <ButtonPaginationSingleton value={currentPage} onPageChange={handlePageChange} total={totalPages} siblings={2} />
    </div>
  )
}
