<?php

use App\Models\Apartment;
use Illuminate\Database\Seeder;

class ApartmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 2; $i < 25; $i++) {
            for ($j = 1; $j < 16; $j++) {

                if ($i == 13 || $j == 13) {
                    continue;
                }

                if ($i == 24 && $j > 3) {
                    continue;
                }

                if (iconv_strlen($j) == 2) {
                    $number = $i . $j;
                } else {
                    $number = $i . '0' . $j;
                }

                Apartment::firstOrCreate([
                        'number' => $number,
                        'floor'  => $i,
                        'type'   => 'apartment',
                    ], [
                        'status' => 'not_sold'
                ]);
            }
        }


        for ($i = 1; $i < 4; $i++) {
            for ($j = 1; $j < 82; $j++) {
                if ($j == 13) {
                    continue;
                }

                if ($i == 1 && $j > 80) {
                    continue;
                }
                if ($i == 3 && $j > 79) {
                    continue;
                }

                if (iconv_strlen($j) == 2) {
                    $number = $i . $j;
                } else {
                    $number = $i . '0' . $j;
                }

                Apartment::firstOrCreate([
                    'number' => $number,
                    'floor'  => 'B' . $i,
                    'type'   => 'parking',
                ], [
                    'status' => 'not_sold'
                ]);
            }
        }

        for ($i = 1; $i < 4; $i++) {
            for ($j = 1; $j < 41; $j++) {
                if ($j == 13) {
                    continue;
                }

                if ($i == 1 && $j > 38) {
                    continue;
                }
                if ($i == 2 && $j > 33) {
                    continue;
                }


                if (iconv_strlen($j) == 2) {
                    $number = $i . $j;
                } else {
                    $number = $i . '0' . $j;
                }

                Apartment::firstOrCreate([
                    'number' => $number,
                    'floor'  => 'B' . $i,
                    'type'   => 'box',
                ], [
                    'status' => 'not_sold'
                ]);
            }
        }
    }
}
