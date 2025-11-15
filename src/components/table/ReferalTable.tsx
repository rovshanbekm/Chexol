import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../../components/ui/table'
import { useGetUsersReferall } from '../../hooks'

export const ReferalTable = () => {
    const { data: referrals } = useGetUsersReferall()
    const referralsArray = Array.isArray(referrals) ? referrals : [];
    return (
        <div className='w-full pt-4'>
            <div className='grid [&>div]:max-h-70 [&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-25'>F.I.O</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {referralsArray.length === 0 ? (
                            <TableRow>
                                <TableCell className='text-center text-placeholderColor'>
                                    Siz hali hech kimni taklif qilmagansiz
                                </TableCell>
                            </TableRow>
                        ) : (
                            referralsArray.map((referall: any) => (
                                <TableRow key={referall.id}>
                                    <TableCell>{referall.paymentMethod}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ReferalTable
