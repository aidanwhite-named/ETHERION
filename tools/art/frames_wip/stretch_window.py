import sys
from PIL import Image
src,out=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB'); W,H=im.size
def remap(im, knots, axis):
    W,H=im.size; L=W if axis=='x' else H
    res=Image.new('RGB',(W,H))
    for (s0,d0),(s1,d1) in zip(knots,knots[1:]):
        a,b=round(s0*L),round(s1*L); c,e=round(d0*L),round(d1*L)
        if axis=='x': piece=im.crop((a,0,b,H)).resize((e-c,H),Image.LANCZOS); res.paste(piece,(c,0))
        else: piece=im.crop((0,a,W,b)).resize((W,e-c),Image.LANCZOS); res.paste(piece,(0,c))
    return res
kx=[(0,0),(.03,.03),(.082,.097),(.944,.944),(1,1)]
ky=[(0,0),(.15,.15),(.55,.6125),(.62,.6825),(.92,.92),(1,1)]
im=remap(im,kx,'x'); im=remap(im,ky,'y'); im.save(out)
