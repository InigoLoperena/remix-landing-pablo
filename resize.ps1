Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\pablo\Desktop\website\src\assets\custom-pointer.png")
$newW = [int]50
$newH = [int]50
$bmp = New-Object System.Drawing.Bitmap($newW, $newH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
$g.DrawImage($img, 0, 0, $newW, $newH)
$g.Dispose()
$img.Dispose()
$bmp.Save("c:\Users\pablo\Desktop\website\src\assets\custom-pointer.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save("c:\Users\pablo\Desktop\website\public\custom-pointer.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
