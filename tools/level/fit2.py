import math
A=180000
def T(b,d):
    t=[0,0]; s=0
    for L in range(1,99):
        s+=A*math.exp(b*(L-1)+d*(L-1)**2); t.append(s)
    return t
tg={5:0.8e6,10:2.2e6,30:10e6,50:28e6,70:65e6,90:250e6,99:550e6}
best=None
for b in [x/2000 for x in range(0,201)]:
    for d in [x/100000 for x in range(0,101)]:
        t=T(b,d); e=sum((math.log(t[k]/v))**2 for k,v in tg.items())
        if best is None or e<best[0]: best=(e,b,d)
e,b,d=best; print(best); t=T(b,d)
W=18104; G=11382
for L in [2,3,4,5,10,20,30,40,50,60,70,80,90,95,99]:
    print(L, round(t[L]), 'wins %.0f'%(t[L]/W), 'games %.0f'%(t[L]/G), 'hrs@12m %.0f'%(t[L]/G/5), 'step', round(A*math.exp(b*(L-2)+d*(L-2)**2)))
