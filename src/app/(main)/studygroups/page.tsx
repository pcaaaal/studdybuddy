'use client';

import * as React from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {ChevronDown, MoreHorizontal} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Input} from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const allGroups = [
	{
		name: 'Mathematical Insights Circle',
		description:
			'Weekly sessions on problem-solving, theory, and mathematical exploration.',
		audience:
			'Undergraduates, graduate students, or anyone passionate about mathematical thinking.',
		color: 'blue',
		tags: ['math', 'problem-solving', 'theory'],
	},
	{
		name: 'Physics Explorers Forum',
		description:
			'Hands-on physics learning with discussions and exam prep.',
		audience:
			'Physics and engineering students looking for deeper understanding and practical experience.',
		color: 'green',
		tags: ['physics', 'engineering', 'exam prep'],
	},
	{
		name: 'Chem Collective',
		description:
			'Collaborative chemistry sessions with demos and problem sets.',
		audience:
			'Chemistry majors, pre-med students, and anyone curious about experimental and theoretical chemistry.',
		color: 'red',
		tags: ['chemistry', 'collaboration', 'experiments'],
	},
	{
		name: 'Life Sciences Roundtable',
		description:
			'A deep dive into biology with quizzes, papers, and discussions.',
		audience:
			'Biology and health sciences students and anyone curious about living systems.',
		color: 'purple',
		tags: ['biology', 'health', 'discussions'],
	},
	{
		name: 'Historical Perspectives Circle',
		description:
			'Interactive history sessions exploring events, sources, and analysis.',
		audience:
			'History enthusiasts, humanities students, and critical thinkers.',
		color: 'yellow',
		tags: ['history', 'analysis', 'interactive'],
	},
];

export type StudyGroup = {
	name: string;
	description: string;
	audience: string;
	tags: string[];
};

export const columns: ColumnDef<StudyGroup>[] = [
	{
		id: 'select',
		header: ({table}) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) =>
					table.toggleAllPageRowsSelected(!!value)
				}
				aria-label="Select all"
			/>
		),
		cell: ({row}) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({row}) => (
			<div className="font-medium">{row.getValue('name')}</div>
		),
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({row}) => <div>{row.getValue('description')}</div>,
	},
	{
		accessorKey: 'audience',
		header: 'Audience',
		cell: ({row}) => <div>{row.getValue('audience')}</div>,
	},
	{
		accessorKey: 'tags',
		header: 'Tags',
		cell: ({row}) => {
			const tags = row.getValue<string[]>('tags'); // Typisierung hinzugefügt
			return (
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="px-2 py-1 text-xs font-medium bg-gray-200 rounded"
						>
							{tag}
						</span>
					))}
				</div>
			);
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({row}) => {
			const group = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(group.name)
							}
						>
							Copy group name
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function StudyGroupsPage() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data: allGroups,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="md:container px-8 space-y-8 max-w-full">
			<h1 className="text-5xl font-extrabold">Study Groups</h1>
			<div className="w-full">
				<div className="flex items-center py-4 gap-4">
					<Input
						placeholder="Filter..."
						value={
							(table
								.getColumn('name')
								?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table
								.getColumn('name')
								?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Columns <ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											// eslint-disable-next-line @typescript-eslint/no-explicit-any
											onCheckedChange={(value: any) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
												  )}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={
											row.getIsSelected() && 'selected'
										}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					<div className="flex-1 text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} of{' '}
						{table.getFilteredRowModel().rows.length} row(s)
						selected.
					</div>
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
